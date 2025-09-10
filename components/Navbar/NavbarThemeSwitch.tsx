import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes";

export const NavbarThemeSwitch = () => {
   const { theme, setTheme } = useTheme();

   return (
      <Switch
         size='sm'
         color='primary'
         thumbIcon={({ isSelected, className }) =>
            isSelected ?
               <div className={className}>🌙</div>
            :  <div className={className}>☀️</div>
         }
         isSelected={theme === "dark"}
         onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      />
   );
};
