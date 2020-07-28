import React, { createContext, useState } from 'react'
const themes = {
    light: {
        text: '#1E152A',
        textLight: 'rgba(30,21,42,0.7)',
    },
    dark: {

    }
}

export const ThemeContext = createContext(themes)

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('light')

    const enableDarkTheme = () => setTheme('dark')
    return (
        <ThemeContext.Provider value={{
            text: themes[theme].text,
            textLight: themes[theme].textLight
        }}>
            {children}
        </ThemeContext.Provider>
    )
} 