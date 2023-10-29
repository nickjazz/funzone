# This is a testing project. Please do not use it in a production environment.

## Funzone

Just another web builder.

### Feature

- Customizing and expanding UI modules (view)
- Customizing styles
- Customizing and expanding configuration modules (setter)

### TLDR

```jsx
const components = [];
const data = [];

const handleChange = (nextData) => {};

<div className="flex gap-10">
  <Funzone ui={components} schema={data} onChange={handleChange}>
    <ComponentsLib className="w-[200px]" />
    <Whiteboard className="flex-1 max-w-[60vw]" />
    <SenSorCenter className="flex-1 max-w-[300px]" />
  </Funzone>
</div>;

```

### Data schema json format

Please ensure that your data schema follows the format provided below.

```js
[
  {
    id: "",
    children: [
      {
        id: "",
        type: "",
        props: {},
        children: [],
      },
    ],
    props: {},
  },
];

```

In a real-life example.

```js
[
  {
    id: "row-2",
    children: [
      {
        id: "col-1-3",
        type: "NavBar",
        props: {
          data: [
            {
              label: "Navigation One",
              key: "mail",
            },
            {
              label: "Navigation Two",
              key: "app",
              disabled: true,
            },
          ],
        },
      },
    ],
    props: {},
  },
  {
    id: "row-3",
    children: [
      {
        id: "col-3-1",
        type: "PageHeader",
        props: {
          title: "show 1",
          span: 3,
        },
      },
    ],
    props: {},
  },
];

```

### Define your UI components

You are free to define and expand any component as you wish. Here's an example of defining a component.

```jsx
const PageHeader = () => {};
const NavBar = () => {};
const Form = () => {};

const components = [
  {
    label: "PageHeader",
    group: "block",
    key: "PageHeader",
    markup: PageHeader,
    defaultProps: { span: 4, title: "default title" },
  },
  {
    label: "NavBar",
    group: "block",
    key: "NavBar",
    markup: NavBar,
    defaultProps: { span: 12 },
  },
  {
    label: "Form",
    group: "inline",
    key: "Form",
    markup: Form,
    defaultProps: { span: 4 },
  },
];

```
