# xMatLib 1.1.5

A bunch of utilities and components to use in your Angular 5+ apps!

## Motivation

Angular Material is a complete tool. But there are ways to use come components which may come handy.
For example xMatLib includes an SCSS library which provides common classes and mixins, 
that you can use in your app to drastically reduce duplicate code!

## Installation

To install this library, run:

```bash
$ npm install ngx-mat-lib --save-dev
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngx-mat-lib
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
