import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route('sign-in', 'routes/root/sign-in.tsx'),
    route('admin-sign-in', 'routes/root/admin-sign-in.tsx'),
    layout('routes/admin/admin-layout.tsx', [
        route('dashboard', 'routes/admin/admin1.tsx'),
        route('all-users', 'routes/admin/all-users.tsx')
    ]) 
    

] satisfies RouteConfig;
