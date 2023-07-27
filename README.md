# Chargify API Documentation

The Chargify API is documented in this repository using the [OpenAPI Specification](https://swagger.io/specification/). It may be used as reference when building interactions with the Chargify API.

## Development

If you are a Chargify developer and need to make changes to the API documentation, please refer to our internal documentation on Stoplight Studio.
This repository is using [Prettier](https://prettier.io/docs/en/index.html) to enforce consistent formatting.

### Required tools and validators

#### Code formatting

Install Prettier and Husky:

```shell
npm install
```

If you want to use Prettier in your IDE check [JetBrains Configuration](https://prettier.io/docs/en/webstorm.html) if you are using JetBrains IDE or
[Editor Integration](https://prettier.io/docs/en/editors.html) for other editors.

Reformat all files manually:

```shell
npx prettier . --write
```

Husky is used to install pre-commit hook for reformatting changed files to ensure your files are properly formatted.

Code needs to be reformatted before commit as formatting is checked by CI pipeline.

#### Validation

This project uses [Spectral](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview) for validation.
Spectral is also used by Stoplight Studio underneath.
You can use Spectral built-in Stoplight Studio, install Spectral plugin for your IDE or you can use standalone Spectral installation:

```shell
npm install -g @stoplight/spectral-cli
```

And then to run linting (execute in the main repo directory):

```shell
 spectral lint -v -F warn ./reference/Chargify-API.v1.yaml
```

You need to fix all Spectral warnings/errors before commit!

## SDK generation

This repository is used for SDK generation. It's important to keep specification compatible with our generators.
You cannot merge your PR if SDK generation fails.
Check output of `Validate specification and build SDKs` pipeline in GitHub Actions if your build fails.
Look at `Build SDKs` step, here is a sample error message:

```text
> Task :validateSpec
Validating spec ../reference/Chargify-API.v1.yaml

Spec has issues or recommendations.

...
...

Spec is invalid.
Issues:

	attribute paths.'/webhooks/replay.json'(post).responses.200.content.'examples'.Example is unexpected
```

It's useful to look at the pipeline output even if it's green as it might contain some warnings which can influence generated code.

### How it works

We are using [OpenAPI Generator](https://openapi-generator.tech/) to generate our SDKs.
Configuration of generators are stored in repository [sdk-generator](https://github.com/maxio-com/sdk-generator).
When PR is opened in `stoplight-platform-api-docs` with target branch `main`/`staging` then `build-sdk` pipeline is run to validate specification.

`publish-sdk` workflow is run manually - it generates code for specified languages, pushes generated code to respective SDK repositories and opens PR in GitHub.
