import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY } from "src/constants/key-decorator";
import { ROLES } from "src/constants/roles";

export const PublicAccess = () => SetMetadata(ADMIN_KEY,ROLES.ADMIN);