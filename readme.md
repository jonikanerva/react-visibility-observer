# Description

React component using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for watching when an element is visible in the viewport.

Written in TypeScript using React Hooks and Context. No dependencies.

# Install

with Yarn

```
yarn add react-visibility-observer
```

or with NPM

```
npm install --save react-visibility-observer
```

# Usage

```jsx
// Component.tsx

import VisibilityObeserver from 'react-visibility-observer'

const Component: React.FC = () => (
  <VisibilityObeserver>
    <ChildComponent />
  </VisibilityObeserver>
)
```

```jsx
// ChildComponent.tsx

import { useVisibilityObserver } from 'react-visibility-observer'

const ChildComponent: React.FC = () => {
  const { isVisible } = useVisibilityObserver()

  return <div>{isVisible ? "I'm visible!" : "I'm hidden!"}</div>
}
```

## Component

You can configure the `VisibilityObeserver` component by passing in the following props.

```jsx
const Component: React.FC = () => (
  <VisibilityObeserver
    className="myClass"
    root={document.querySelector('#scrollArea')}
    rootMargin="50px 50px 50px 50px"
    threshold={0.2}
  >
    <ChildComponent />
  </VisibilityObeserver>
)
```

| Prop         |  Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`  | `string`               | Custom class for the tracked `div`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `root`       | `Element` or `null`    | The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to `null` which is the browser viewport.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `rootMargin` | `string`               | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.                                                                                                                                                                                                                                                          |
| `threshold`  | `number` or `number[]` | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible. |

## Hook

You can get info from the observer by using the `useVisibilityObserver` hook in the child components.

```ts
const { isVisible, entries } = useVisibilityObserver()
```

|  Variable    |  Type                         | Description                                                                                                                               |
| ------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
|  `isVisible` | `boolean`                     | Is the observed element in view.                                                                                                          |
|  `entries`   | `IntersectionObserverEntry[]` | Array of [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) objects being observerd. |
