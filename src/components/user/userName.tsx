import { getUserInfo } from "../../utils/auth";

export default function UserName() {
  const user = getUserInfo();

  return (
    <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
      {user.name}
    </p>
  );
}
