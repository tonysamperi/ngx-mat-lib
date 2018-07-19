# xMatLib 1.2.10

A bunch of utilities and components to use in your Angular 5+ apps!

## Motivation

Angular Material is a complete tool. But there are ways to use come components which may come handy.
For example xMatLib includes an SCSS library which provides common classes and mixins, 
that you can use in your app to drastically reduce duplicate code!

## Utils

### xmat-mock

This util allow you to mock your frontend calls when developing, by simply creating some json and a list.
Advanced behaviours can be achieved with custom callbacks and custom mock urls.

## Included Angular Components

### xmat-accordion

Wrapper for mat-expansion-panel

| Part                  | Selector                 |
|:---------------------:|:------------------------:|
| Accordion header      | .xmat-accordion-title    |
| Accordion description | .xmat-accordion-desc     |
| Accordion content     | .xmat-accordion-content  |

####Options

| Option      | Type         |
|:-----------:|:------------:|
| expanded    | boolean      |
| disabled    | boolean      |
| color       | ThemePalette |

### xmat-action-text

A simple directive to add interactive look to any text.
Useful on click bindings

####Options

| Option      | Type         |
|:-----------:|:------------:|
| disabled    | boolean      |
| color       | ThemePalette |

MORE DESCRIPTIONS COMING

###Other components

* xmat-dialog (alert + confirm)
* xmat-global-spinner
* xmat-legend
* xmat-mini-chip-list
* xmat-overlay
* xmat-pipes
* xmat-snack-bar
* xmat-spinner
* xmat-time-input
* xmat-validators

## Installation

To install this library, run:

```bash
$ npm install ngx-mat-lib --save-dev
```

## Development

* Edit src files
* Update version in package.json and src/package.json
* Commit
* Run npm build
* Run npm publish dist

## Consuming your library

Once published to npm, you can update your library in any Angular application by running:

```bash
$ npm install ngx-mat-lib@latest
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import what you need from ngx-mat-lib
import { SampleModule } from 'ngx-mat-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify the import
    SampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

##Thanks to

jvandemo with his generator-angular2-library

## License

MIT © [Tony Samperi](mailto:github@tonysamperi.it)
