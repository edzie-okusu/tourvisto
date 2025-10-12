import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route('api/route', 'routes/api/create-trip.ts'),
    route('sign-in', 'routes/root/sign-in.tsx'),
    route('admin-sign-in', 'routes/root/admin-sign-in.tsx'),
    layout('routes/admin/admin-layout.tsx', [
        route('dashboard', 'routes/admin/admin1.tsx'),
        route('all-users', 'routes/admin/all-users.tsx'),
        route('trips', 'routes/admin/trips.tsx'),
        route('trips/create', 'routes/admin/create-trip.tsx')
    ]) 
    

] satisfies RouteConfig;
