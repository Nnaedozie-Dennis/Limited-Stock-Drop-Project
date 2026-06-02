// import { useEffect, useState } from 'react';
// import { supabase } from './utils/supabase';
// import './App.css';

// function App() {
//   const [status, setStatus] = useState('Connecting to Supabase...');

//   useEffect(() => {
//     async function checkConnection() {
//       const { data, error } = await supabase.auth.getSession();

//       if (error) {
//         setStatus(`Supabase connection failed: ${error.message}`);
//         return;
//       }

//       setStatus(
//         data.session
//           ? 'Supabase connected, session active'
//           : 'Supabase connected, no session'
//       );
//     }

//     checkConnection();
//   }, []);

//   return (
//     <div className="App">
//       <p>{status}</p>
//     </div>
//   );
// }

// export default App;

import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;