# react-sanfona


[![NPM info](https://nodei.co/npm/react-sanfona.png?downloads=true)](https://nodei.co/npm/react-sanfona.png?downloads=true)

[![Travis build status](https://travis-ci.org/daviferreira/react-sanfona.png?branch=master)](https://travis-ci.org/daviferreira/react-sanfona)
[![dependencies](https://david-dm.org/daviferreira/react-sanfona.png)](https://david-dm.org/daviferreira/react-sanfona)
[![devDependency Status](https://david-dm.org/daviferreira/react-sanfona/dev-status.png)](https://david-dm.org/daviferreira/react-sanfona#info=devDependencies)


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
import { Accordion, AccordionItem } from 'react-sanfona';

…

	render: function () {
		return (
			<Accordion>
				{[1, 2, 3, 4, 5].map((item) => {
					return (
						<AccordionItem title={`Item ${ item }`} slug={item} key={item}>
							<div>
								{`Item ${ item } content`}
								{item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
							</div>
						</AccordionItem>
					);
				})}
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.7.7/babel.min.js" type="text/javascript" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react-dom.min.js"></script>
<script src="react-sanfona/dist/react-sanfona.js" type="text/javascript" charset="utf-8"></script>
```

```javascript
<script type="text/javascript">
	var input = `
		var Accordion = ReactSanfona.default.Accordion;
		var AccordionItem = ReactSanfona.default.AccordionItem;

		ReactDOM.render(
		    <Accordion>
		      {[1, 2, 3, 4, 5].map(function (item) {
		        return (
		          <AccordionItem title={'Item' + item} key={item} titleColor="blue">
		            <div>
		              {'Item ' +  item + ' content'}
		              {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
		            </div>
		          </AccordionItem>
		        );
		      })}
		    </Accordion>,
		    document.getElementById('demo')
		);
	`

	var output = Babel.transform(input, { presets: ['es2015', 'react'] }).code;
	var script = document.createElement('script');
	script.innerHTML = output;
	document.body.appendChild(script);
</script>
```

## options / PropTypes

#### Accordion
* **allowMultiple:** allow multiple items to be open at the same time (default: false)
* **activeItems:** receives either an array of indexes or a single index. Each index corresponds to the item order, starting from 0. Ex: activeItems={0}, activeItems=[0, 1, 2]
* **onChange:** function with the new state as an argument
* **onClick:** function with item key as argument. Overrides default click handler, so activeItems props are respected

#### AccordionItem
* **title:** Text to display in header
* **slug:** Key used in activeItems lookup
* **expanded:** Expand item body
* **className:** Custom class for this item. Also have **bodyClassName**, **expandedClassName**, & **titleClassName**

## development

```
npm install

npm run demo

npm test
```
