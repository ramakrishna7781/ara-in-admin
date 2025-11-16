// import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminHome from "./pages/AdminHome";   // <-- ADD THIS

// export default function App() {
//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* PUBLIC ROUTES */}
//         <Route path="/login" element={<Login />} />

//         {/* PROTECTED ROUTES */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <AdminHome />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </HashRouter>
//   );
// }



import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHome from "./pages/AdminHome";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />

        {/* PUBLIC */}
        <Route path="login" element={<Login />} />

        {/* PRIVATE */}
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}
