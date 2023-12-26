# ТЗ

1. С помощью DevContainer в Visual Studio создать плагин типа Panel для Grafana её же средствами. https://grafana.com/go/webinar/building-your-first-panel-plugin/

2. Запустить Grafana для отладки панели и подключить в ней собранный проект в DevContainer.

3. Добавить плагин на Dashboard в Grafana.

4. Плагин должен:
   • Представлять из себя таблицу
   • Рендерить себя с помощью SVG или Canvas
   • Выводить временной ряд: метка времени, параметр1, параметр2, параметр3. Значения параметров рандом. Метка времени растёт с начала суток до конца суток часа. Значения есть только до текущего часа, остиальные равны ---
   • Добавить конфигурационный атрибут выбор поля для сортировки.
   • Добавить возможность сортировать по полям: метка времени, параметр1, параметр2, параметр3 - кликнув по полю.

## What are Grafana panel plugins?

## Getting started

### Frontend

1. Install dependencies

   ```bash
   npm install
   ```

2. Build plugin in development mode and run in watch mode

   ```bash
   npm run dev
   ```

3. Build plugin in production mode

   ```bash
   npm run build
   ```

4. Spin up a Grafana instance and run the plugin inside it (using Docker)

   ```bash
   npm run server
   ```

5. Тестировал на TestData - CSV File - population_by_state.csv

# Distributing your plugin

## Initial steps

Before signing a plugin please read the Grafana [plugin publishing and signing criteria](https://grafana.com/legal/plugins/#plugin-publishing-and-signing-criteria) documentation carefully.

`@grafana/create-plugin` has added the necessary commands and workflows to make signing and distributing a plugin via the grafana plugins catalog as straightforward as possible.

Before signing a plugin for the first time please consult the Grafana [plugin signature levels](https://grafana.com/legal/plugins/#what-are-the-different-classifications-of-plugins) documentation to understand the differences between the types of signature level.

1. Create a [Grafana Cloud account](https://grafana.com/signup).
2. Make sure that the first part of the plugin ID matches the slug of your Grafana Cloud account.
   - _You can find the plugin ID in the `plugin.json` file inside your plugin directory. For example, if your account slug is `acmecorp`, you need to prefix the plugin ID with `acmecorp-`._
3. Create a Grafana Cloud API key with the `PluginPublisher` role.
4. Keep a record of this API key as it will be required for signing a plugin

## Signing a plugin

### Using Github actions release workflow

If the plugin is using the github actions supplied with `@grafana/create-plugin` signing a plugin is included out of the box. The [release workflow](./.github/workflows/release.yml) can prepare everything to make submitting your plugin to Grafana as easy as possible. Before being able to sign the plugin however a secret needs adding to the Github repository.

1. Please navigate to "settings > secrets > actions" within your repo to create secrets.
2. Click "New repository secret"
3. Name the secret "GRAFANA_API_KEY"
4. Paste your Grafana Cloud API key in the Secret field
5. Click "Add secret"

#### Push a version tag

To trigger the workflow we need to push a version tag to github. This can be achieved with the following steps:

1. Run `npm version <major|minor|patch>`
2. Run `git push origin main --follow-tags`

## Learn more

Below you can find source code for existing app plugins and other related documentation.

- [Basic panel plugin example](https://github.com/grafana/grafana-plugin-examples/tree/master/examples/panel-basic#readme)
- [`plugin.json` documentation](https://grafana.com/developers/plugin-tools/reference-plugin-json)
- [How to sign a plugin?](https://grafana.com/developers/plugin-tools/publish-a-plugin/sign-a-plugin)
