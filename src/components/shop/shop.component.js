import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../collection-overview/collection-overview.component";
import CollectionPage from "../../pages/collection/collection.component";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/store/shop.actions";
import WithSpinner from "../with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = { loading: true };

  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection("collection");

    this.unsubcribeFromSnapshot = collectionRef.onSnapshot(async (snapShot) => {
      const collectionToUpdate = convertCollectionsSnapshotToMap(snapShot);

      updateCollection(collectionToUpdate);
      this.setState({ loading: false });
    });
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (collectionToUpdate) =>
    dispatch(updateCollections(collectionToUpdate)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
