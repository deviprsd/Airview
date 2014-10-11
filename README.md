Bootstrap-Airview (Airview Images just like a tooltip)
======================================================
Bootstrap-Airview is a Javascript plugin which displays single image as Bootstrap Tooltip. It requires Bootstraps Tooltip.js and JQuery.js to work, both of these plugins are provided. 

# Beautifully Sleek
<img src="https://raw.githubusercontent.com/deviprsd21/Bootstrap-Airview/master/img/screenshots/1.jpg" alt="Bootstrap-Airview" style="width: 50%" />
<img src="https://raw.githubusercontent.com/deviprsd21/Bootstrap-Airview/master/img/screenshots/3.jpg" alt="Bootstrap-Airview-Amazingly-Responsive" style="width: 50%" />
<img src="https://raw.githubusercontent.com/deviprsd21/Bootstrap-Airview/master/img/screenshots/2.jpg" alt="Bootstrap-Airview-Zoomed" />

# How to Use
Lightweight as < 3.05kb. And really simple to use. **It is mandatory to include Bootstrap tooltip.js.
Include these scripts before `</body>` tag.**
```HTML
<script src="./js/vendor/jquery.min.js"></script>
<script src="./js/vendor/tooltip.min.js"></script>
<script src="./js/bootstrap-airview.min.js"></script>
```
**Initialize Airview**
```JavaScript
$("img").airview(options);
```
**Options**

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| animation | boolean | true | Apply a CSS fade transition to the **Airview** |
| container | string / false | false | Appends the **Airview** to a specific element. Example: `container: 'body'`. This option is particularly useful in that it allows you to position the **Airview** in the flow of the document near the triggering element - which will prevent the **Airview** from floating away from the triggering element during a window resize. |
| content | string / function | '' | Default content value if `data-content` attribute isn't present. If a function is given, it will be called with its `this` reference set to the element that the **Airview** is attached to. |
| delay | number / object | 0 | Delay showing and hiding the **Airview** (ms) - does not apply to manual trigger type. If a number is supplied, delay is applied to both hide/show. Object structure is: delay: `{ "show": 500, "hide": 100 }` |
| error | string | 'Image Not Found' | Error message that will be shown if no `title` or `content` or `data-content` option are not found |
| html  | boolean  | false | Insert HTML into the **Airview**. If false, jQuery's `text` method will be used to insert content into the DOM. **Use text if you're worried about XSS attacks**. |
| placement | string / function | 'right' | How to position the **Airview** - `top / bottom / left / right / auto`. When "auto" is specified, it will dynamically reorient the **Airview**. For example, if placement is "auto left", the **Airview** will display to the left when possible, otherwise it will display right. When a function is used to determine the placement, it is called with the **Airview** DOM node as its first argument and the triggering element DOM node as its second. The `this` context is set to the **Airview** instance. |
|template | string | `'<div class="airview" role="tooltip"><div class="airview-arrow"></div><div class="airview-inner"><div class="airview-loader"></div><img /></div></div>'` | Base HTML to use when creating the **Airview**. The **Airview's** `title` or `data-content` will be injected into the **src attribute** of `.airview-inner img`. `.airview-arrow` will become the **Airview's** arrow. The outermost wrapper element should have the `.airview` class. **Note: You can use `title` or `data-content` to set `.airview-inner img` _src attribute_, but we recommend `data-content`**|
|title | string | function | '' | Default `title` value if title attribute isn't present. If a function is given, it will be called with its `this` reference set to the element that the **Airview** is attached to.|
|trigger | string | 'hover focus' | How **Airview** is triggered - click / hover / focus / manual. You may pass multiple triggers; separate them with a space.|
| url | string / false | false | Sets common url to all the **Airview** elements / selector. |
|viewport | string / object | { selector: 'body', padding: 0 } 	| Keeps the **Airview** within the bounds of this element. Example: `viewport: '#viewport'` or `{ "selector": "#viewport", "padding": 0 }` |
| width | integer / string | 'auto' | Sets `max-width` to `.airview-inner img`. If set to auto `width` will be set to `500`| 

**Methods**
### .airview('show')
Reveals an elements popover.
```JavaScript
$('#element').airview('show')
```

### .airview('hide')
Hides an elements popover.
```JavaScript
$('#element').airview('hide')
```

### .airview('toggle')
Toggles an elements popover.
```JavaScript
$('#element').airview('toggle')
```

### .airview('destroy')
Hides and destroys an element's popover.
```JavaScript
$('#element').airview('destroy')
```
**Events**

| Event Type | Description |
| ---------- | ----------- |
| show.bs.airview | This event fires immediately when the show instance method is called. |
| shown.bs.airview | This event is fired when the **Airview** has been made visible to the user (will wait for CSS transitions to complete). |
| hide.bs.airview | This event is fired immediately when the hide instance method has been called. |
| hidden.bs.airview | This event is fired when the **Airview** has finished being hidden from the user (will wait for CSS transitions to complete). |

**Example**
```HTML
<body>
  <img src="img/thumbnail/1.jpg" data-content="1.jpg" width="80">
  <img src="img/thumbnail/2.jpg" data-content="2.jpg" width="80">
  <img src="img/thumbnail/3.jpg" data-content="3.jpg" width="80">

  <script src="./js/vendor/jquery.min.js"></script>
  <script src="./js/vendor/tooltip.min.js"></script>
  <script src="./js/bootstrap-airview.min.js"></script>
  <script>JavaScript Mentioned Below</script>
</body>
```
```JavaScript
$('img').airview({
  url: './img/',
  width: 200,
  container: 'body',
  error: 'Sorry! No Image found'
});
```

