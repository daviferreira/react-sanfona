# react-sanfona

[![Build Status](https://travis-ci.org/daviferreira/react-sanfona.svg?branch=master)](https://travis-ci.org/daviferreira/react-sanfona)

React accordion component

![giphy 1](https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif)

## Usage

### CommonJS

Install via NPM:

```
npm install react-sanfona
```

Then:

```javascript
require(‘react-sanfona’);

…

	render: function () {
		return (
			<Accordion>
				<AccordionItem />
			</Accordion>
		);
	}

…

```

### Browser

Download or install via bower:

```
bower install react-sanfona
```

Then:

```html
<script src=“https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.min.js” type=“text/javascript” charset=“utf-8”></script>
<script src=“https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js” type=“text/javascript” charset=“utf-8”></script>
<script src=“≈react-sanfona/dist/react-sanfona.js” type=“text/javascript” charset=“utf-8”></script>
```

```javascript
<script type=“text/jsx”>
var Accordion = ReactSanfona.Accordion;
var AccordionItem = ReactSanfona.AccordionItem;

React.render(
    <Accordion>
      {[1, 2, 3, 4, 5].map(function (item) {
        return (
          <AccordionItem title={`Item ${ item }`} key={item}>
            <div>
              {‘Item ‘ +  item + ‘ content’}
              {item === 3 ? <p><img src=“https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif” /></p> : null}
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>,
    document.getElementById(‘example’)
);
</script>
```

## development

```
npm install

npm run demo

npm test
```
