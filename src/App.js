import { Fragment } from "react/cjs/react.production.min";

import MainHeader from "./components/Layout/MainHeader";
import Layout from "./components/Layout/Layout";
import PostList from "./components/Post/PostList";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <Layout>
        <PostList/>
      </Layout>
    </Fragment>
  );
}

export default App;
