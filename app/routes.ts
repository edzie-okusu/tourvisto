import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('routes/admin/admin-layout.tsx', [
        route('dashboard', 'routes/admin/admin1.tsx'),
        route('all-users', 'routes/admin/all-users.tsx')
    ]) 
    

] satisfies RouteConfig;
