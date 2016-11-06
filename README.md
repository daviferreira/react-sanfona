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
| Property | Type | Description | Default |
|:---|:---|:---|:---|
| allowMultiple | `Boolean` | Allow multiple items to be open at the same time. | `false` |
| activeItems | `Array` | Receives either an array of indexes or a single index. Each index corresponds to the item order, starting from 0. Ex: activeItems={0}, activeItems=[0, 1, 2] | `[0]` |
| openNextAccordionItem | `Boolean` | Opens the next accordion item after the previous one is closed. Defaults first one as active and applies for each accordion item except the last one. Not compatible when passing in a custom slug | `false` |
| className | `String` | Custom classname applied to root div | `null` |
| style | `Object` | Inline styles applied to root div | `null` |
| onChange | `Function` | Triggered when component updates and passes new state as an argument | `null` |

#### AccordionItem
| Property | Type | Description | Default |
|:---|:---|:---|:---|
| title | `String`/ `Object` | Text or Object to display in header. | `null` |
| slug | `String/Number` | Key used in activeItems lookup | `null` |
| expanded | `Boolean` | If item body should be expanded or not | `false` |
| onExpand | `Function` | Callback for when item is expanded | `null` |
| onClose | `Function` | Callback for when item closes | `null` |
| className | `String` | Custom classname applied to root item div | `null` |
| bodyClassName | `String` | Custom classname applied to the accordion item body | `null` |
| expandedClassName | `String` | Custom classname applied when accordion is expanded | `null` |
| titleClassName | `String` | Custom classname applied to accordion item header text | `null` |
| disabled | `Boolean` | If item should be expanded or not | `false` |
| disabledClassName | `String` | Custom classname applied to accordion item header text when item is disabled | `null` |

## Styling with classnames
| Classname | Targets |
|:---|:---|
| `react-sanfona`| Accordion container |
| `react-sanfona-item` | AccordionItem container |
| `react-sanfona-item-expanded` | AccordionItem container when expanded |
| `react-sanfona-item-title` | AccordionItem header text |
| `react-sanfona-item-body` | AccordionItem body container |
| `react-sanfona-item-body-wrapper` | AccordionItem body children wrapper |
| `react-sanfona-item-disabled` | AccordionItem is disabled |


## development

```
npm install

npm run demo // served on localhost:8080

npm test
```
