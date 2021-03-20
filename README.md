# analyze-that-ui-web

## install app's dependencies
npm install

## serve with hot reload at localhost:8080
npm run serve

## build for production with minification
npm run build

## run linter
npm run lint

## run unit tests
npm run test:unit

## run e2e tests
npm run test:e2e

## Docker build image
docker build -t ngladkoffglb/analyze-that-ui-web .

## Docker run
docker run -it -p 8080:80 --rm --name analyze-web ngladkoffglb/analyze-that-ui-web