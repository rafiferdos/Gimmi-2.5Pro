import { 
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar 
} from "@heroui/react";

export const UserDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform hover:scale-110"
          color="primary"
          name="User"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Profile Actions" 
        variant="flat"
        className="backdrop-blur-md"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">user@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};