import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// ctx는 컨트롤러에서 받는 오브젝트
export const Ip = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip;
  },
);
