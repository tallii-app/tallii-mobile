# tallii

an ios and android application for the tallii platform.

## todo

## troubleshooting

if you run into errors with hmr, run the following command

```sh
watchman watch-del-all && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
```