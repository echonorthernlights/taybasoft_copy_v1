import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AdminPrivateRoute from "./components/AdminPrivateRoute"
import Loader from "./components/Loader"
import PrivateRoute from "./components/PrivateRoute"
import {
  AddNewPack,
  AddNewSubscriber,
  AddNewSubscription,
  AllPacks,
  AllSubscribers,
  Dashboard,
  DashboardLayout,
  EditSubscriber,
  Error,
  HomeLayout,
  Landing,
  Login,
  RemovePack,
  RemoveSubscriber,
  RemoveSubscription,
  SubscriberDetails,
  UpdatePack,
  UpdateSubscription,
} from "./pages"
import { fetchRole } from './slices/users/userAuthSlice'

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") == "true"
  document.body.classList.toggle("dark-theme", isDarkTheme)
  return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <AdminPrivateRoute>
            <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />
          </AdminPrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "packs",
            element: <AllPacks />,
          },
          {
            path: "packs/new",
            element: <AddNewPack />,
          },
          {
            path: "packs/edit/:packId",
            element: <UpdatePack />,
          },
          {
            path: "packs/delete/:packId",
            element: <RemovePack />,
          },
          {
            path: "subscribers",
            element: <AllSubscribers />,
          },
          {
            path: "subscribers/new",
            element: <AddNewSubscriber />,
          },
          {
            path: "subscribers/:subscriberId",
            element: <SubscriberDetails />,
          },
          {
            path: "subscribers/:subscriberId/edit",
            element: <EditSubscriber />,
          },
          {
            path: "subscribers/:subscriberId/delete",
            element: <RemoveSubscriber />,
          },
          {
            path: "subscribers/:subscriberId/subscriptions/new",
            element: <AddNewSubscription />,
          },
          {
            path: "subscribers/:subscriberId/subscriptions/:subscriptionId/edit",
            element: <UpdateSubscription />,
          },
          {
            path: "subscribers/:subscriberId/subscriptions/:subscriptionId/delete",
            element: <RemoveSubscription />,
          },
        ],
      },
      {
        path: "app",
        element: (
          <PrivateRoute>
            <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <div>user dashboard page</div>,
          },
        ],
      },
    ],
  },
])

const App = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading } = useSelector((state) => state.userAuth)
  if (!isAuthenticated && user !== null && user.userRole == null) {
    dispatch(fetchRole(user.role))
  }
  if (loading) return <Loader center />

  return <RouterProvider router={router} />
}
export default App
