import { Button } from "@/components/ui/button";
import useLogOut from "@/hooks/useLogout";

export default function Home() {
  const logOut = useLogOut();

  return (
    <div>
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
}
