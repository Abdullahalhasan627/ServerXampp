<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إضافة منشور جديد - لوحة التحكم</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!-- تحديث إلى أحدث إصدار من CKEditor -->
    <script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js"></script>
    <style>
        .ck-editor__editable {
            min-height: 200px;
        }
        .ck-editor__editable_inline {
            direction: inherit;
        }
        [dir="rtl"] .ck-editor__editable {
            text-align: right;
        }
        [dir="ltr"] .ck-editor__editable {
            text-align: left;
        }
    </style>
</head>
<body class="bg-gray-100">
    <div class="min-h-screen">
        <!-- شريط التنقل -->
        <nav class="bg-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <a href="dashboard.php" class="text-xl font-bold">لوحة التحكم</a>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <a href="logout.php" class="text-gray-700 hover:text-gray-900">تسجيل الخروج</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- المحتوى الرئيسي -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="bg-white shadow rounded-lg p-6">
                    <h1 class="text-2xl font-semibold text-gray-900 mb-6">إضافة منشور جديد</h1>
                    
                    <?php if (isset($_SESSION['success'])): ?>
                        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span class="block sm:inline"><?php echo $_SESSION['success']; ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if (isset($_SESSION['error'])): ?>
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span class="block sm:inline"><?php echo $_SESSION['error']; ?></span>
                        </div>
                    <?php endif; ?>

                    <form method="POST" enctype="multipart/form-data" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- العنوان بالعربية -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700">
                                    العنوان بالعربية
                                </label>
                                <input type="text" name="title_ar" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            </div>

                            <!-- العنوان بالإنجليزية -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700">
                                    العنوان بالإنجليزية
                                </label>
                                <input type="text" name="title_en" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            </div>

                            <!-- المحتوى بالعربية -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700">
                                    المحتوى بالعربية
                                </label>
                                <textarea id="content_ar" name="content_ar" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    rows="6"></textarea>
                            </div>

                            <!-- المحتوى بالإنجليزية -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700">
                                    المحتوى بالإنجليزية
                                </label>
                                <textarea id="content_en" name="content_en" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    rows="6"></textarea>
                            </div>
                        </div>

                        <!-- الصورة -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                الصورة
                            </label>
                            <input type="file" name="image" accept="image/*"
                                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        </div>

                        <!-- أزرار التحكم -->
                        <div class="flex justify-end space-x-3 space-x-reverse">
                            <button type="submit"
                                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                إضافة المنشور
                            </button>
                            <a href="dashboard.php"
                                class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                إلغاء
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>

    <script>
        // تحسين إعدادات CKEditor
        const editorConfig = {
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'blockQuote',
                    'insertTable',
                    'undo',
                    'redo'
                ]
            },
            table: {
                contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
            }
        };

        // تهيئة محرر المحتوى العربي
        ClassicEditor
            .create(document.querySelector('#content_ar'), {
                ...editorConfig,
                language: 'ar',
                removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload']
            })
            .then(editor => {
                editor.editing.view.change(writer => {
                    writer.setAttribute('dir', 'rtl', editor.editing.view.document.getRoot());
                });
            })
            .catch(error => console.error(error));

        // تهيئة محرر المحتوى الإنجليزي
        ClassicEditor
            .create(document.querySelector('#content_en'), {
                ...editorConfig,
                language: 'en',
                removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload']
            })
            .then(editor => {
                editor.editing.view.change(writer => {
                    writer.setAttribute('dir', 'ltr', editor.editing.view.document.getRoot());
                });
            })
            .catch(error => console.error(error));
    </script>
</body>
</html> 