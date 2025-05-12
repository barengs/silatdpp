import { z } from "zod";

z.setErrorMap((issue, ctx) => {
  const customMessages: Record<string, string> = {
    "string.email": "Email tidak valid!",
    "invalid_type": "Invalid input type!",
  };

  const message = customMessages[issue.code] || ctx.defaultError;
  return { message };
});

export default z;
