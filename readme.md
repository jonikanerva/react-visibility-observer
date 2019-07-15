# Description

React component using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for watching when an element is visible in the viewport.

Written in TypeScript using React hooks and context.

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

import VisibilityObeserver from "react-visibility-observer";

const Component: React.FC = () => (
  <VisibilityObeserver>
    <ChildComponent />
  </VisibilityObeserver>
);
```

```jsx
// ChildComponent.tsx

import { useVisibilityObserver } from "react-visibility-observer";

const ChildComponent: React.FC = () => {
  const { isVisible } = useVisibilityObserver();

  return <div>{isVisible ? "I'm visible!" : "I'm hidden!"}</div>;
};
```
