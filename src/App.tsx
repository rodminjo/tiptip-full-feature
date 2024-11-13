import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Tiptap from "./components/tiptap/Tiptap";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <main style={{padding: "55px 45px"}}>
                    <div style={{padding: "20px", border: "1px solid #cacad6", borderRadius: '10px'}}>
                        <Tiptap/>
                    </div>
                </main>
            )
        },
    ]);


    return (
        <RouterProvider router={router}/>
    );
}

export default App;
