"use client"
import { Provider } from "react-redux";
import { store } from ".";

export default function ReduxProvider({children}: {children: React.ReactNode}) {
    return Provider({store, children})
}