#!/bin/bash

# Radex Migration Script
# Moves files from old Radical Exploder project to new Ondergrond site
# Comments out React files and changes extensions to .tsx

SOURCE_DIR="/Users/david_hutchings/code/Radical Exploder/radex"
DEST_DIR="/Users/david_hutchings/code/ondergrond/src/modules/rad-ex/orig"

echo "🚀 Starting Radex migration..."
echo "Source: $SOURCE_DIR"
echo "Destination: $DEST_DIR"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory does not exist: $SOURCE_DIR"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Function to comment out a file
comment_out_file() {
    local file_path="$1"
    echo "  📝 Commenting out: $(basename "$file_path")"
    
    # Create a temporary file with comments
    {
        echo "/*"
        echo " * COMMENTED OUT - Original Radex file"
        echo " * Migrate manually to new React/TypeScript patterns"
        echo " * Original file: $(basename "$file_path")"
        echo " */"
        echo ""
        echo "/*"
        cat "$file_path"
        echo "*/"
    } > "${file_path}.tmp"
    
    # Replace original with commented version
    mv "${file_path}.tmp" "$file_path"
}

# Function to check if file contains React content
is_react_file() {
    local file_path="$1"
    
    # Check for common React patterns
    if grep -q -E "(import.*React|from.*react|class.*extends.*Component|function.*\(\)|const.*=.*\(\)|export.*default)" "$file_path" 2>/dev/null; then
        return 0  # true - is React file
    else
        return 1  # false - not React file
    fi
}

# Copy all files recursively
echo "📂 Copying files..."
cp -r "$SOURCE_DIR"/* "$DEST_DIR"/

# Process all .js files in the destination
echo "🔧 Processing JavaScript files..."

find "$DEST_DIR" -name "*.js" -type f | while read -r js_file; do
    echo "🔍 Processing: $(basename "$js_file")"
    
    # Check if it's a React file
    if is_react_file "$js_file"; then
        echo "  ⚛️  React file detected"
        
        # Comment out the file
        comment_out_file "$js_file"
        
        # Change extension to .tsx
        tsx_file="${js_file%.js}.tsx"
        mv "$js_file" "$tsx_file"
        echo "  ✅ Renamed to: $(basename "$tsx_file")"
    else
        echo "  📄 Non-React file, leaving as .js"
    fi
done

# Process any .jsx files too
echo "🔧 Processing JSX files..."

find "$DEST_DIR" -name "*.jsx" -type f | while read -r jsx_file; do
    echo "🔍 Processing: $(basename "$jsx_file")"
    echo "  ⚛️  JSX file detected"
    
    # Comment out the file
    comment_out_file "$jsx_file"
    
    # Change extension to .tsx
    tsx_file="${jsx_file%.jsx}.tsx"
    mv "$jsx_file" "$tsx_file"
    echo "  ✅ Renamed to: $(basename "$tsx_file")"
done

# Summary
echo ""
echo "✅ Migration complete!"
echo "📊 Summary:"
echo "   - Files copied to: $DEST_DIR"
echo "   - React files have been commented out and renamed to .tsx"
echo "   - Non-React .js files left unchanged"
echo ""
echo "🔄 Next steps:"
echo "   1. Review the copied files"
echo "   2. Manually uncomment and migrate React components"
echo "   3. Update imports and convert to TypeScript"
echo "   4. Test each component as you migrate"
echo ""
echo "🎉 Ready to bring Radex into Ondergrond!"