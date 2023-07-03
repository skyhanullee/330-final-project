import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Icon } from '@iconify/react';

function ThemeButton() {
  const { themeName, setThemeName } = useContext(UserContext);
  return (
    <button
      id="theme-button"
      onClick={() => {
        themeName === 'dark-mode' ? setThemeName('light-mode') : setThemeName('dark-mode')
      }}>
      <Icon
        className='icon'
        id="theme-icon"
        icon={
          themeName === 'dark-mode' ?
            "material-symbols:dark-mode" : "material-symbols:light-mode"
        }
      />
    </button>
  )
}
export default ThemeButton
