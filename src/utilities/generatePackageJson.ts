import basePackageJson from '../../package.json'

export function generatePackageJson(siteConfig: any, npmComponents: string[]): any {
  // Add npm components to dependencies
  const additionalDeps: Record<string, string> = {}

  npmComponents.forEach(pkg => {
    // Use latest version for now - could fetch from npm registry
    additionalDeps[pkg] = 'latest'
  })

  return {
    ...basePackageJson,
    name: siteConfig.slug,
    description: `Website for ${siteConfig.siteName}`,
    version: "1.0.0",
    dependencies: {
      ...basePackageJson.dependencies,
      ...additionalDeps,
    },
    devDependencies: basePackageJson.devDependencies,
    scripts: basePackageJson.scripts,
    engines: basePackageJson.engines,
    pnpm: basePackageJson.pnpm,
    packageManager: basePackageJson.packageManager,
  }
}
