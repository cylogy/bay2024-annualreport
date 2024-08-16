import {
  EditingDataDiskCache,
  BasicEditingDataService,
  ServerlessEditingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';

// Override the default editingDataDiskCache with an accessible temp directory
export const myEditingDataDiskCache = new EditingDataDiskCache(process.env.EDITING_TMP_DIRECTORY);

// Override default editingDataService to use myEditingDataDiskCache for BasicEditingDataService
export const myEditingDataService = process.env.VERCEL
  ? new ServerlessEditingDataService()
  : new BasicEditingDataService({
      editingDataCache: myEditingDataDiskCache,
    });
