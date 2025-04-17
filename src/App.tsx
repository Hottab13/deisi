import { useEffect } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import EntriesPage from "./pages/EntriesPage";
import { EntriesPostPage } from "./pages/EntriesPostPage";
import { EntriesAddPostPage } from "./pages/EntriesAddPostPage";
import OrdersPage from "./pages/OrdersPage";
import { OrdersPostPage } from "./pages/OrdersPostPage";
import FinancePage from "./pages/FinancePage";
import { FinancePostPage } from "./pages/FinancePostPage";
import ClientsPage from "./pages/ClientsPage";
import { ClientsAddPostPage } from "./pages/ClientsAddPostPage";
import { FinanceAddPostPage } from "./pages/FinanceAddPostPage";
import { OrdersAddPostPage } from "./pages/OrdersAddPostPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<EntriesPage />} />
      <Route index path="*" element={<EntriesPage />} />
      <Route path="/entries-post/" element={<EntriesPostPage />} />
      <Route path="/entries-add-post/" element={<EntriesAddPostPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders-post/" element={<OrdersPostPage />} />
      <Route path="/orders-add-post/" element={<OrdersAddPostPage />} />
      <Route path="/finance" element={<FinancePage />} />
      <Route path="/finance-post/" element={<FinancePostPage />} />
      <Route path="/finance-add-post/" element={<FinanceAddPostPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/clients-add-post/" element={<ClientsAddPostPage />} />
      
     {/* <Route path="sports/:type/:sport?" element={<SportsPage />} />
      <Route path="sports/" element={<Navigate to="live" replace />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
      <Route path="prematch/:matchId" element={<PrematchPage />} />
      <Route path="live/:matchId" element={<LiveMatchPage />} />*/}
    </Route>
  )
);

const App: React.FC = () => {
  // const [checkUser] = useCheckUserMutation();
  //const dispatch = useAppDispatch();
  //const { isLoader,  } = useAppSelector((state) => state.rootReducer.authSlice);

  /*const initializeUserDataAndToken = useCallback(async (token: string) => {
    try {
      const result = await checkUser({ refreshToken: token }).unwrap();
      if (result) {
        dispatch(setUserData(result));
      }
    } catch (error: any) {
      toaster.create({
        title: "Error",
        description: error.data.message || "Error",
        type: "error",
        duration: 10000,
      });
    }
  }, []);*/

  useEffect(() => {
    //dispatch(setLoader(true));

    //console.log("Application version:", import.meta.env.VITE_APP_VERSION);

    /* const token = Cookies.get("refreshToken");
    if (token) initializeUserDataAndToken(token);
    if (!token) fetchGeolocationAPI();*/
  }, []);

  return (
    <>
      {/*isLoader && <Loader fullPage={true} />*/}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
