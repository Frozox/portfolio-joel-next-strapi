export default () => ({
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  "schemas-to-ts": {
    enabled: true,
    config: {
      acceptedNodeEnvs: ["development"],
      commonInterfacesFolderName: "sharedSchemas",
      verboseLogs: false,
      alwaysAddEnumSuffix: false,
    },
  },
});
