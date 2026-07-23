/**
 * EduGlobe Academy — Role-Based Access Control (RBAC)
 * Defines permissions for each role and provides helper functions
 * for checking access in middleware, Server Actions, and components.
 */

export type Role = "STUDENT" | "TUTOR" | "PARENT" | "ADMIN" | "BRANCH_MANAGER" | "MANAGER";

export const PERMISSIONS = {
  // User Management
  "users.view": "View user profiles",
  "users.manage": "Create, edit, suspend users",
  "users.delete": "Delete user accounts",

  // Course Management
  "courses.view": "View courses",
  "courses.create": "Create new courses",
  "courses.edit": "Edit course details",
  "courses.delete": "Delete courses",
  "courses.publish": "Publish/unpublish courses",
  "courses.enroll": "Enroll in courses",

  // Class Management
  "classes.view": "View classes",
  "classes.create": "Schedule new classes",
  "classes.edit": "Edit class details",
  "classes.host": "Host/start live classes",
  "classes.join": "Join live classes",
  "classes.delete": "Cancel/delete classes",

  // Assignment Management
  "assignments.view": "View assignments",
  "assignments.create": "Create assignments",
  "assignments.submit": "Submit assignments",
  "assignments.grade": "Grade assignment submissions",

  // Quiz Management
  "quizzes.view": "View quizzes",
  "quizzes.create": "Create quizzes",
  "quizzes.take": "Take quizzes",
  "quizzes.grade": "Grade quiz submissions",

  // Payment Management
  "payments.view": "View payment history",
  "payments.manage": "Manage payments, refunds, invoices",
  "payments.make": "Make payments",

  // Communication
  "messages.send": "Send messages",
  "messages.view": "View messages",
  "notifications.manage": "Manage notification settings",

  // Reports & Analytics
  "reports.view": "View reports",
  "reports.generate": "Generate reports",
  "analytics.view": "View analytics dashboard",

  // Admin
  "admin.dashboard": "Access admin dashboard",
  "admin.settings": "Manage system settings",
  "admin.branches": "Manage branches",
  "admin.tutors.approve": "Approve/reject tutor applications",

  // Parent
  "children.view": "View children's data",
  "children.manage": "Manage linked children",
} as const;

export type Permission = keyof typeof PERMISSIONS;

/**
 * Permissions granted to each role.
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  STUDENT: [
    "courses.view",
    "courses.enroll",
    "classes.view",
    "classes.join",
    "assignments.view",
    "assignments.submit",
    "quizzes.view",
    "quizzes.take",
    "payments.view",
    "payments.make",
    "messages.send",
    "messages.view",
    "notifications.manage",
    "reports.view",
  ],

  TUTOR: [
    "courses.view",
    "courses.create",
    "courses.edit",
    "classes.view",
    "classes.create",
    "classes.edit",
    "classes.host",
    "assignments.view",
    "assignments.create",
    "assignments.grade",
    "quizzes.view",
    "quizzes.create",
    "quizzes.grade",
    "payments.view",
    "messages.send",
    "messages.view",
    "notifications.manage",
    "reports.view",
    "analytics.view",
  ],

  PARENT: [
    "courses.view",
    "classes.view",
    "assignments.view",
    "quizzes.view",
    "payments.view",
    "payments.make",
    "messages.send",
    "messages.view",
    "notifications.manage",
    "reports.view",
    "children.view",
    "children.manage",
  ],

  ADMIN: Object.keys(PERMISSIONS) as Permission[],

  BRANCH_MANAGER: [
    "users.view",
    "users.manage",
    "courses.view",
    "courses.create",
    "courses.edit",
    "courses.publish",
    "classes.view",
    "classes.create",
    "classes.edit",
    "classes.delete",
    "assignments.view",
    "assignments.create",
    "assignments.grade",
    "quizzes.view",
    "quizzes.create",
    "quizzes.grade",
    "payments.view",
    "payments.manage",
    "messages.send",
    "messages.view",
    "notifications.manage",
    "reports.view",
    "reports.generate",
    "analytics.view",
    "admin.dashboard",
    "admin.tutors.approve",
  ],

  MANAGER: [
    "users.view",
    "users.manage",
    "courses.view",
    "courses.create",
    "courses.edit",
    "courses.publish",
    "classes.view",
    "classes.create",
    "classes.edit",
    "classes.delete",
    "assignments.view",
    "assignments.create",
    "assignments.grade",
    "quizzes.view",
    "quizzes.create",
    "quizzes.grade",
    "payments.view",
    "payments.manage",
    "messages.send",
    "messages.view",
    "notifications.manage",
    "reports.view",
    "reports.generate",
    "analytics.view",
    "admin.dashboard",
  ],
};


/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if any of the user's roles have a specific permission.
 */
export function hasAnyPermission(
  roles: Role[],
  permission: Permission
): boolean {
  return roles.some((role) => hasPermission(role, permission));
}

/**
 * Check if the user has ALL specified permissions.
 */
export function hasAllPermissions(
  roles: Role[],
  permissions: Permission[]
): boolean {
  return permissions.every((permission) =>
    roles.some((role) => hasPermission(role, permission))
  );
}

/**
 * Get all permissions for a set of roles.
 */
export function getPermissions(roles: Role[]): Permission[] {
  const permissionSet = new Set<Permission>();
  for (const role of roles) {
    for (const permission of ROLE_PERMISSIONS[role] || []) {
      permissionSet.add(permission);
    }
  }
  return Array.from(permissionSet);
}

/**
 * Route access configuration — which roles can access which dashboard routes.
 */
export const ROUTE_ACCESS: Record<string, Role[]> = {
  "/student": ["STUDENT"],
  "/tutor": ["TUTOR"],
  "/parent": ["PARENT"],
  "/admin": ["ADMIN"],
  "/manager": ["BRANCH_MANAGER", "MANAGER"],
};
/**
 * Get the default dashboard path for a role.
 */
export function getDashboardPath(role: Role): string {
  const paths: Record<Role, string> = {
    STUDENT: "/student",
    TUTOR: "/tutor",
    PARENT: "/parent",
    ADMIN: "/admin",
    BRANCH_MANAGER: "/manager",
    MANAGER: "/manager",
  };
  return paths[role] || "/dashboard";
}

/**
 * Check if a user with given roles can access a specific route.
 */
export function canAccessRoute(roles: Role[], path: string): boolean {
  // Admin can access everything
  if (roles.includes("ADMIN")) return true;

  // Check specific route access
  for (const [routePrefix, allowedRoles] of Object.entries(ROUTE_ACCESS)) {
    if (path.startsWith(routePrefix)) {
      return roles.some((role) => allowedRoles.includes(role));
    }
  }

  // Public routes are accessible to everyone
  return true;
}
