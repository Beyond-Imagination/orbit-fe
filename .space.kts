job("Build and deploy") {
    startOn {
        gitPush {
            anyBranchMatching {
                +"main"
                +"develop"
            }
        }
    }

    container(displayName = "build", image = "node:alpine") {

        shellScript {
            content = """

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/develop" ]; then
                    cat .env.development > .env.production
                fi

                yarn
                yarn build
                cp -r out ${'$'}JB_SPACE_FILE_SHARE_PATH/out
            """
        }
    }

    container(displayName = "deploy", image = "amazon/aws-cli") {
        env["AWS_ACCESS_KEY_ID"] = "{{ project:AWS_ACCESS_KEY_ID }}"
        env["AWS_ACCESS_KEY_SECRET"] = "{{ project:AWS_ACCESS_KEY_SECRET }}"

        shellScript {
            content = """
                ls -al ${'$'}JB_SPACE_FILE_SHARE_PATH/out
                aws --version

                export AWS_ACCESS_KEY_ID=${'$'}AWS_ACCESS_KEY_ID
                export AWS_ACCESS_KEY_SECRET=${'$'}AWS_ACCESS_KEY_SECRET
                export AWS_DEFAULT_REGION=ap-northeast-2

                echo ${'$'}JB_SPACE_GIT_BRANCH

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/develop" ]; then
                    aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://orbit-frontend-dev/out
                    aws cloudfront create-invalidation --distribution-id E36LDJJOTGQG37 --paths "/*"
                elif [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/main" ]; then
                    aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://orbit-frontend-main/out
                    aws cloudfront create-invalidation --distribution-id E2ET5M5YHBDNVO --paths "/*"
                else
                    echo "Deployment is not supported on this branch."
                fi
            """
        }
    }
}
