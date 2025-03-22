#!/bin/bash
# Fix all @/ imports to use relative paths

# Replace imports in app directory
find app -name "*.tsx" -type f -exec sed -i '' -e 's|@/lib/auth-context|../../lib/auth-context|g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' -e 's|@/lib/utils|../../lib/utils|g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' -e 's|@/components/ui/button|../../components/ui/button|g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' -e 's|@/components/ui/|../../components/ui/|g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' -e 's|@/components/|../../components/|g' {} \;

# Fix component imports
find components -name "*.tsx" -type f -exec sed -i '' -e 's|@/lib/utils|../lib/utils|g' {} \;
find components -name "*.tsx" -type f -exec sed -i '' -e 's|@/components/ui/button|./ui/button|g' {} \;
find components -name "*.tsx" -type f -exec sed -i '' -e 's|@/lib/auth-context|../lib/auth-context|g' {} \;
find components -name "*.tsx" -type f -exec sed -i '' -e 's|@/components/ui/|./ui/|g' {} \;
find components -name "*.tsx" -type f -exec sed -i '' -e 's|@/components/|./|g' {} \;

# Fix ui component imports
find components/ui -name "*.tsx" -type f -exec sed -i '' -e 's|@/lib/utils|../../lib/utils|g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i '' -e 's|@/components/ui/|../|g' {} \;

echo "Import paths fixed!" 