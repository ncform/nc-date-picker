# nc-date-picker

nc-date-picker widget for [ncform](https://github.com/ncform/ncform)

## Install and basic usage

```
npm i -s @ncform/nc-date-picker
```

**Add the widget**

```
import ncDatePicker from '@ncform/nc-date-picker';

Vue.use(vueNcform, { extComponents: {ncDatePicker} });

// or vm.$ncformAddWidget({name: 'ncDatePicker', widget: ncDatePicker});

```

**Use the widget**

```
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "widget": "nc-date-picker",
      "widgetConfig": {
          type: 'datetime',
          valueFormat: 'timestamp',
          valueDigits: 10
      }
    }
  }
}
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

You only need to care about `src/components/index.vue`

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```
