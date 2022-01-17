# Next.js SSR with Contentstack Live preview

# How to use

1. Create one entry with `title` and `single_line` field.
2. create `next.config.js` using the `next.config.sample.js`
3. Run the project within Contentstack

## What have we done

The idea is to use the SSR documentation for the live preview. We moved the `ContentstackLivePreview.init()` at the `utils.js` where we have initialized the `Contentstack`. Then, we have used the `Stack.livePreviewQuery` and passed the query param to it. We got the query param from the prop of `getServerSideProps()`.
