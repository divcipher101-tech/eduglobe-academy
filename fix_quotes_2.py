def replace_in_line(filepath, line_num):
    try:
        with open(filepath, 'r') as f:
            lines = f.readlines()
        idx = line_num - 1
        lines[idx] = lines[idx].replace("'", "&apos;")
        with open(filepath, 'w') as f:
            f.writelines(lines)
    except:
        pass

replace_in_line("src/app/(dashboard)/parent/children/page.tsx", 48)
replace_in_line("src/app/(dashboard)/student/assignments/[assignmentId]/page.tsx", 97)
replace_in_line("src/app/(marketing)/cookies/page.tsx", 26)
replace_in_line("src/app/(marketing)/courses/CourseCatalogClient.tsx", 216)
replace_in_line("src/app/(marketing)/secondary/page.tsx", 43)

