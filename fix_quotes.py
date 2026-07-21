import re
import sys

def fix_lint_file(lint_file):
    with open(lint_file, 'r') as f:
        lines = f.readlines()
        
    current_file = None
    fixes = {}
    
    for line in lines:
        line = line.strip()
        if line.startswith('/home/cipher/'):
            current_file = line
            if current_file not in fixes:
                fixes[current_file] = []
        elif "react/no-unescaped-entities" in line:
            # Parse line number
            match = re.search(r'^(\d+):(\d+)', line)
            if match and current_file:
                line_num = int(match.group(1))
                char_pos = int(match.group(2))
                fixes[current_file].append((line_num, char_pos, line))
                
    for filepath, file_fixes in fixes.items():
        if not file_fixes:
            continue
        try:
            with open(filepath, 'r') as f:
                content_lines = f.readlines()
        except:
            continue
            
        # We process line by line. Since there can be multiple fixes per line,
        # it's easiest to just replace typical unescaped quotes on that line if they are inside JSX text.
        # But a safer hack for Next.js is just replace ' with &apos; and " with &quot; in the whole line if it's JSX text.
        # Let's just do a simple string replace for "don't", "It's", "let's", "you're", "we'll", etc.
        for line_num, char_pos, msg in file_fixes:
            idx = line_num - 1
            if "`\"` can be escaped" in msg:
                content_lines[idx] = content_lines[idx].replace('"', '&quot;')
            else:
                # single quote
                content_lines[idx] = content_lines[idx].replace("don't", "don&apos;t")
                content_lines[idx] = content_lines[idx].replace("won't", "won&apos;t")
                content_lines[idx] = content_lines[idx].replace("can't", "can&apos;t")
                content_lines[idx] = content_lines[idx].replace("It's", "It&apos;s")
                content_lines[idx] = content_lines[idx].replace("it's", "it&apos;s")
                content_lines[idx] = content_lines[idx].replace("let's", "let&apos;s")
                content_lines[idx] = content_lines[idx].replace("You're", "You&apos;re")
                content_lines[idx] = content_lines[idx].replace("you're", "you&apos;re")
                content_lines[idx] = content_lines[idx].replace("We'll", "We&apos;ll")
                content_lines[idx] = content_lines[idx].replace("we'll", "we&apos;ll")
                content_lines[idx] = content_lines[idx].replace("we're", "we&apos;re")
                content_lines[idx] = content_lines[idx].replace("We're", "We&apos;re")
                content_lines[idx] = content_lines[idx].replace("I'm", "I&apos;m")
                content_lines[idx] = content_lines[idx].replace("I'll", "I&apos;ll")
                content_lines[idx] = content_lines[idx].replace("I've", "I&apos;ve")
                content_lines[idx] = content_lines[idx].replace("student's", "student&apos;s")
                content_lines[idx] = content_lines[idx].replace("tutor's", "tutor&apos;s")
                content_lines[idx] = content_lines[idx].replace("parent's", "parent&apos;s")
                content_lines[idx] = content_lines[idx].replace("admin's", "admin&apos;s")
                content_lines[idx] = content_lines[idx].replace("world's", "world&apos;s")
                content_lines[idx] = content_lines[idx].replace("Today's", "Today&apos;s")
                content_lines[idx] = content_lines[idx].replace("today's", "today&apos;s")
                content_lines[idx] = content_lines[idx].replace("You've", "You&apos;ve")
                content_lines[idx] = content_lines[idx].replace("We've", "We&apos;ve")
                content_lines[idx] = content_lines[idx].replace("you'll", "you&apos;ll")
                content_lines[idx] = content_lines[idx].replace("They're", "They&apos;re")
                content_lines[idx] = content_lines[idx].replace("they're", "they&apos;re")
                content_lines[idx] = content_lines[idx].replace("Who's", "Who&apos;s")
                content_lines[idx] = content_lines[idx].replace("what's", "what&apos;s")
                content_lines[idx] = content_lines[idx].replace("What's", "What&apos;s")
                content_lines[idx] = content_lines[idx].replace("There's", "There&apos;s")
                content_lines[idx] = content_lines[idx].replace("there's", "there&apos;s")
                content_lines[idx] = content_lines[idx].replace("Here's", "Here&apos;s")
                content_lines[idx] = content_lines[idx].replace("here's", "here&apos;s")
                content_lines[idx] = content_lines[idx].replace("That's", "That&apos;s")
                content_lines[idx] = content_lines[idx].replace("that's", "that&apos;s")
                content_lines[idx] = content_lines[idx].replace("child's", "child&apos;s")
                content_lines[idx] = content_lines[idx].replace("Children's", "Children&apos;s")
                content_lines[idx] = content_lines[idx].replace("children's", "children&apos;s")
                content_lines[idx] = content_lines[idx].replace("Let's", "Let&apos;s")
                content_lines[idx] = content_lines[idx].replace("We'll", "We&apos;ll")
                content_lines[idx] = content_lines[idx].replace("doesn't", "doesn&apos;t")
                content_lines[idx] = content_lines[idx].replace("Didn't", "Didn&apos;t")
                content_lines[idx] = content_lines[idx].replace("didn't", "didn&apos;t")
                content_lines[idx] = content_lines[idx].replace("Wasn't", "Wasn&apos;t")
                content_lines[idx] = content_lines[idx].replace("wasn't", "wasn&apos;t")
                content_lines[idx] = content_lines[idx].replace("Isn't", "Isn&apos;t")
                content_lines[idx] = content_lines[idx].replace("isn't", "isn&apos;t")
                content_lines[idx] = content_lines[idx].replace("Aren't", "Aren&apos;t")
                content_lines[idx] = content_lines[idx].replace("aren't", "aren&apos;t")
                content_lines[idx] = content_lines[idx].replace("Haven't", "Haven&apos;t")
                content_lines[idx] = content_lines[idx].replace("haven't", "haven&apos;t")
                content_lines[idx] = content_lines[idx].replace("Hasn't", "Hasn&apos;t")
                content_lines[idx] = content_lines[idx].replace("hasn't", "hasn&apos;t")
                content_lines[idx] = content_lines[idx].replace("We'd", "We&apos;d")
                content_lines[idx] = content_lines[idx].replace("I'd", "I&apos;d")
                content_lines[idx] = content_lines[idx].replace("They'll", "They&apos;ll")
                content_lines[idx] = content_lines[idx].replace("they'll", "they&apos;ll")

        with open(filepath, 'w') as f:
            f.writelines(content_lines)

if __name__ == "__main__":
    fix_lint_file("lint-results.txt")
