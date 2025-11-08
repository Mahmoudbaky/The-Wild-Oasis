import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../components/Heading";
import { Button } from "@/components/ui/button";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div>
      <Heading as="h1">
        The page you are looking for could not be found 😢
      </Heading>
      <Button onClick={moveBack} variant="secondary">
        &larr; Go back
      </Button>
    </div>
  );
}

export default PageNotFound;
