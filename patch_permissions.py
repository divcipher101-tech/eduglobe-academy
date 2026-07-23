with open("src/lib/permissions.ts", "r") as f:
    content = f.read()

manager_permissions = """
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
"""

content = content.replace("};", manager_permissions)
content = content.replace('"/manager": ["BRANCH_MANAGER"],', '"/manager": ["BRANCH_MANAGER", "MANAGER"],')
content = content.replace('BRANCH_MANAGER: "/manager",', 'BRANCH_MANAGER: "/manager",\n    MANAGER: "/manager",')

with open("src/lib/permissions.ts", "w") as f:
    f.write(content)
