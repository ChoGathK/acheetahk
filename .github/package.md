# 发布和内容管理

| 操作类型 | 操作内容 | 命令示例 |
|:-:|:-:|:-:|
| workspace | 系统启用 workspaces | `yarn config set workspaces-experimental true` |
| workspace | 全局增加/删除 | `yarn workspace add/remove chalk` |
| workspace | 局部增加/删除 | `yarn workspace <name> add/remove chalk` |
| workspace | 执行命令 | `yarn workspace <name> run build` |
| lerna | 导入已有包 | `lerna import <path>` |
| lerna | 创建新包 | `lerna create <name>` |
| lerna | 增量发布 | `yarn publishing` |
| lerna | 更新依赖 | `yarn reload` |
| lerna | 构建 | `yarn build` |
| lerna | 查看已有 | `lerna ls` |
| npm | 撤销组织包 | `npm unpublish <name> --force` |
| npm | 发布组织包 | `npm publish --access public` |
| npm | 提示已启用 | `npm deprecate <pkg>[@<version>] <message>` |
| devops | 自动代码检查、自动构建、自动同步到 github | `yarn push "why"` |
