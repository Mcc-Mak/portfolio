# opencode-ai
## Priority
- `Linux`: up-to-date
- `Windows`: Legacy
## Installation
Run `bash INSTALL`
## Container
Run `docker exec -it opencode-ai sh`
## Sample
```
root@ccmak-ubuntu26:/home/ccmak/workplace/ai-opencode-devsecops# bash INSTALL 
ai-opencode-devsecops
Untagged: ai-opencode-devsecops:latest
Deleted: sha256:5f88b4e574f8fd85577593d3d8cb123cc5e0383079ca2328f43db4bb794bd0ff
Deleted: sha256:c1fa2fe9672dfb98fcf213e9e5cdbe3a44af63af521cb58fb2108a152ae3e29e
Deleted: sha256:b4506de34205d87b85a54fece09c764f8f0e191eae9d7be759548466f8312abe
Deleted: sha256:9cd49d2630c1ed96106d3b8baddd7ecb3a05d3cb38e619bf9dc77e5180f82cd5
Deleted: sha256:58682a206efab956acf7cf88b01e80e6511dc2725625c3fa54b3e873561065e0
Deleted: sha256:93170fbdf70438237108c4e36d460b3469084e80701a0fbaf885a93501defef2
Deleted: sha256:d34485b555ee409a2eebd5cf1686b804e09cc0b60a9eec0314c53fb6c99578f4
Deleted: sha256:1b7c6d855bf33e7c62194737a7c906377ca8947cb75d5f273225488b5c9e638a
Deleted: sha256:e0334d201347d142cdc606b08697f0a31f3440afc89d1b8c41e49238bea75523
Deleted: sha256:49301cc8abea8aa1f43581e373b41e69f427fd25af7a3a7363fb61f8a3762b3b
Deleted: sha256:06106a6ac8bb816a3aa863e08e71e0646d38b2a8f7e93f00990d97978825b458
Deleted: sha256:4fdf9edfc016a3bbbdb1b45d0449a54a990f0ca943e25f1c9875a165e544fd5d
Deleted: sha256:324e0a48aff627fa644e3196927434301a46eac84fd92f0e26b7aa3f00849184
Deleted: sha256:659e3335caf891476be91bc8d8e360488682808baa956713f0f716e005ec7d6f
Deleted: sha256:53379d90330dc5eefe91ab0d719c71f14479dd3fb10e57f1cbbc1c261540e1a7
Deleted: sha256:a40abaef93da2f785a60afe7b11e0887eeb653a25f87af70e25cb037b44a6b57
Deleted: sha256:d5ab8923a05a071a34e56ce45a58ad4069489a9d89bf3df8289c34675319c4a0
Deleted: sha256:14ac93e1408b26b0890dc8ab4ccb95e3ee44c9624333d5458e2893f34aa8d0d6
Deleted: sha256:83c0c30c5857b70cbff0b4fd11fcd65758029a8efd6d49f770b6332a159d93fe
Deleted: sha256:b78970fc06e3366eccb6cbe3957b636c1a20cadb40e813cda2280810d5dcf5b5
Deleted: sha256:6ec100f2b6f8d029d3f33577eeb464bd9205b8cb8fcdaaa3e1873e3072eb3632
Deleted: sha256:4cec5d867dc5c5661569439233fb5bc494b3f6c81ffe80f15425059eaef0f6bf
Deleted: sha256:e281adcbea3e38d59e6c159ad24c44a4d71ae972db7dadbaa8106b8492c273f3
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  1.106MB
Step 1/24 : FROM node:20-alpine
 ---> fb4cd12c85ee
Step 2/24 : ARG DIR_WORKSPACE
 ---> Running in 620350729f29
 ---> Removed intermediate container 620350729f29
 ---> f409a7ba15e9
Step 3/24 : ARG DIR_OPENCODE
 ---> Running in b26dff142361
 ---> Removed intermediate container b26dff142361
 ---> 379972a2ec90
Step 4/24 : ARG DIR_OPENCODE_MCP
 ---> Running in 5896629e817d
 ---> Removed intermediate container 5896629e817d
 ---> 5a0230804711
Step 5/24 : ARG DIR_OPENCODE_G_CONFIG
 ---> Running in 33f309a9da67
 ---> Removed intermediate container 33f309a9da67
 ---> a82b64fd9faa
Step 6/24 : ARG HKOAI_API_KEY
 ---> Running in 18ef9db19674
 ---> Removed intermediate container 18ef9db19674
 ---> 345141c1a1a6
Step 7/24 : ARG MYSQL_HOST
 ---> Running in f6b48dbcf3c4
 ---> Removed intermediate container f6b48dbcf3c4
 ---> a7b622bec24a
Step 8/24 : ARG MYSQL_PORT
 ---> Running in e454b98d9905
 ---> Removed intermediate container e454b98d9905
 ---> ab57a855a104
Step 9/24 : ARG MYSQL_USER
 ---> Running in 402920a08b54
 ---> Removed intermediate container 402920a08b54
 ---> c36cf75d8768
Step 10/24 : ARG MYSQL_PASSWORD
 ---> Running in 75652c97831b
 ---> Removed intermediate container 75652c97831b
 ---> 3cd55eda4ba5
Step 11/24 : ENV NODE_TLS_REJECT_UNAUTHORIZED=0     DIR_WORKSPACE=${DIR_WORKSPACE}     DIR_OPENCODE=${DIR_OPENCODE}     DIR_OPENCODE_MCP=${DIR_OPENCODE_MCP}     DIR_OPENCODE_G_CONFIG=${DIR_OPENCODE_G_CONFIG}     HKOAI_API_KEY=${HKOAI_API_KEY}     MYSQL_HOST=${MYSQL_HOST}     MYSQL_PORT=${MYSQL_PORT}     MYSQL_USER=${MYSQL_USER}     MYSQL_PASSWORD=${MYSQL_PASSWORD}     PATH="${DIR_OPENCODE}/bin:${PATH}"
 ---> Running in b81fda95db9b
 ---> Removed intermediate container b81fda95db9b
 ---> 08ccee00436d
Step 12/24 : USER root
 ---> Running in 1a2f95cd781a
 ---> Removed intermediate container 1a2f95cd781a
 ---> feda24f3c4c7
Step 13/24 : WORKDIR ${DIR_WORKSPACE}
 ---> Running in 39a8dd34c0d1
 ---> Removed intermediate container 39a8dd34c0d1
 ---> 066a296d8aa8
Step 14/24 : RUN apk add --no-cache     curl     bash     python3     py3-pip     git     github-cli
 ---> Running in f068b61fb266
( 1/37) Installing ncurses-terminfo-base (6.5_p20251123-r0)
( 2/37) Installing libncursesw (6.5_p20251123-r0)
( 3/37) Installing readline (8.3.1-r0)
( 4/37) Installing bash (5.3.3-r1)
  Executing bash-5.3.3-r1.post-install
( 5/37) Installing brotli-libs (1.2.0-r0)
( 6/37) Installing c-ares (1.34.8-r0)
( 7/37) Installing libunistring (1.4.1-r0)
( 8/37) Installing libidn2 (2.3.8-r0)
( 9/37) Installing nghttp2-libs (1.69.0-r0)
(10/37) Installing libpsl (0.21.5-r3)
(11/37) Installing zstd-libs (1.5.7-r2)
(12/37) Installing libcurl (8.20.0-r0)
(13/37) Installing curl (8.20.0-r0)
(14/37) Installing libexpat (2.8.2-r0)
(15/37) Installing pcre2 (10.47-r0)
(16/37) Installing git (2.52.0-r0)
(17/37) Installing git-init-template (2.52.0-r0)
(18/37) Installing github-cli (2.83.0-r6)
(19/37) Installing libbz2 (1.0.8-r6)
(20/37) Installing libffi (3.5.2-r0)
(21/37) Installing gdbm (1.26-r0)
(22/37) Installing xz-libs (5.8.3-r0)
(23/37) Installing mpdecimal (4.0.1-r0)
(24/37) Installing libpanelw (6.5_p20251123-r0)
(25/37) Installing sqlite-libs (3.51.2-r0)
(26/37) Installing python3 (3.12.13-r0)
(27/37) Installing python3-pycache-pyc0 (3.12.13-r0)
(28/37) Installing pyc (3.12.13-r0)
(29/37) Installing py3-setuptools-pyc (80.9.0-r2)
(30/37) Installing py3-pip-pyc (25.1.1-r1)
(31/37) Installing py3-packaging-pyc (25.0-r0)
(32/37) Installing python3-pyc (3.12.13-r0)
(33/37) Installing py3-parsing (3.2.5-r0)
(34/37) Installing py3-parsing-pyc (3.2.5-r0)
(35/37) Installing py3-packaging (25.0-r0)
(36/37) Installing py3-setuptools (80.9.0-r2)
(37/37) Installing py3-pip (25.1.1-r1)
Executing busybox-1.37.0-r30.trigger
OK: 138.9 MiB in 55 packages
 ---> Removed intermediate container f068b61fb266
 ---> 3b8548567e9a
Step 15/24 : RUN curl -fsSL https://opencode.ai/install | bash
 ---> Running in 130526b97508

Installing opencode version: 1.18.11
######################################################################## 100.0%

                                 ▄     
█▀▀█ █▀▀█ █▀▀█ █▀▀▄ █▀▀▀ █▀▀█ █▀▀█ █▀▀█
█░░█ █░░█ █▀▀▀ █░░█ █░░░ █░░█ █░░█ █▀▀▀
▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀  ▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀


OpenCode includes free models, to start:

cd <project>  # Open directory
opencode      # Run command

For more information visit https://opencode.ai/docs




 ---> Removed intermediate container 130526b97508
 ---> f1e1d24e0c98
Step 16/24 : RUN npm install -g intelephense
 ---> Running in 492a87fe6bed
(node:1) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
(Use `node --trace-warnings ...` to show where the warning was created)

added 127 packages in 37s

15 packages are looking for funding
  run `npm fund` for details
npm notice
npm notice New major version of npm available! 10.8.2 -> 12.0.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.0.2
npm notice To update run: npm install -g npm@12.0.2
npm notice
 ---> Removed intermediate container 492a87fe6bed
 ---> 3e3b51e6f3b7
Step 17/24 : RUN npm install -g     @modelcontextprotocol/server-filesystem     mysql-mcp-server
 ---> Running in 41c38682ea23
(node:1) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
(Use `node --trace-warnings ...` to show where the warning was created)
npm warn deprecated glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me

added 159 packages in 17s

49 packages are looking for funding
  run `npm fund` for details
 ---> Removed intermediate container 41c38682ea23
 ---> d00a37674991
Step 18/24 : RUN mkdir -p ${DIR_OPENCODE_G_CONFIG}     ${DIR_OPENCODE_G_CONFIG}/agents     ${DIR_OPENCODE_G_CONFIG}/commands     ${DIR_OPENCODE_G_CONFIG}/skills
 ---> Running in a8a1082928c8
 ---> Removed intermediate container a8a1082928c8
 ---> 463d3bf44375
Step 19/24 : COPY opencode.json ${DIR_OPENCODE_G_CONFIG}/opencode.jsonc
 ---> 558d8256451d
Step 20/24 : RUN chown -R root:root ${DIR_OPENCODE_G_CONFIG} &&     chmod -R 755 ${DIR_OPENCODE_G_CONFIG}
 ---> Running in fd06f02d32b3
 ---> Removed intermediate container fd06f02d32b3
 ---> fa8d590cb72d
Step 21/24 : EXPOSE 80
 ---> Running in 594dabdd83a4
 ---> Removed intermediate container 594dabdd83a4
 ---> b446e2689594
Step 22/24 : HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3     CMD curl -f http://localhost:80/health || exit 1
 ---> Running in b3b7c3a865b0
 ---> Removed intermediate container b3b7c3a865b0
 ---> 5981ad1a1393
Step 23/24 : CMD ["/bin/sh", "-c", "${DIR_OPENCODE}/bin/opencode serve --port 80 --hostname 0.0.0.0"]
 ---> Running in 3c3a5f8db748
 ---> Removed intermediate container 3c3a5f8db748
 ---> 0b4f37a18179
Step 24/24 : LABEL build_comment=Mon Aug  3 06:47:05 PM UTC 2026
 ---> Running in fc7f19b28da3
 ---> Removed intermediate container fc7f19b28da3
 ---> e7a1aa89d64e
Successfully built e7a1aa89d64e
Successfully tagged ai-opencode-devsecops:latest
a66b6021e0ead70abc2bfd03eb8bcc6d1033e12c83c0ed54140122486b9a36db
cp: can't stat '/workplace/mcp/mcp-factory-documentation/commands': No such file or directory
cp: can't stat '/workplace/mcp/mcp-workflow-sdlc/agents': No such file or directory
cp: can't stat '/workplace/mcp/mcp-workflow-sdlc/commands': No such file or directory
cp: can't stat '/workplace/mcp/mcp-workflow-sdlc/skills': No such file or directory
ai-opencode-devsecops
ai-opencode-devsecops:/workplace# 
```
