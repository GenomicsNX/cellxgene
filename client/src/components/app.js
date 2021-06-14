import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import DatasetSelector from "./datasetSelector/datasetSelector";
import Container from "./framework/container";
import Layout from "./framework/layout";
import LeftSideBar from "./leftSidebar";
import RightSideBar from "./rightSidebar";
import Legend from "./continuousLegend";
import Graph from "./graph/graph";
import MenuBar from "./menubar";
import Autosave from "./autosave";
import Embedding from "./embedding";
import TermsOfServicePrompt from "./termsPrompt";

import actions from "../actions";

@connect((state) => ({
  loading: state.controls.loading,
  error: state.controls.error,
  graphRenderCounter: state.controls.graphRenderCounter,
  skeleton: state.skeleton.skeleton,
}))
class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    /* listen for url changes, fire one when we start the app up */
    window.addEventListener("popstate", this._onURLChanged);
    this._onURLChanged();

    dispatch(actions.doInitialDataLoad(window.location.search));
    this.forceUpdate();
  }

  _onURLChanged() {
    const { dispatch } = this.props;

    dispatch({ type: "url changed", url: document.location.href });
  }

  render() {
    const { loading, error, graphRenderCounter, skeleton } = this.props;
    return (
      <Container>
        <Helmet title="cellxgene" />
        {loading && !skeleton ? (
          <div
            style={{
              position: "fixed",
              fontWeight: 500,
              top: window.innerHeight / 2,
              left: window.innerWidth / 2 - 50,
            }}
          >
            loading cellxgene
          </div>
        ) : null}
        {error ? (
          <div
            style={{
              position: "fixed",
              fontWeight: 500,
              top: window.innerHeight / 2,
              left: window.innerWidth / 2 - 50,
            }}
          >
            error loading cellxgene
          </div>
        ) : null}
        {(loading && !skeleton) || error ? null : (
          <Layout>
            <LeftSideBar />
            {(viewportRef) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    left: 8,
                    position: "absolute",
                    right: 8,
                    top: 0,
                    zIndex: 3,
                  }}
                >
                  <DatasetSelector />
                  <MenuBar />
                </div>
                {skeleton ? null : (
                  <>
                    <Embedding />
                    <Autosave />
                    <TermsOfServicePrompt />
                    <Legend viewportRef={viewportRef} />
                    <Graph key={graphRenderCounter} viewportRef={viewportRef} />
                  </>
                )}
              </>
            )}
            <RightSideBar />
          </Layout>
        )}
      </Container>
    );
  }
}

export default App;
