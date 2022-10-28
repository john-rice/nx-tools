import { ExecutorContext } from '@nrwl/devkit';
import { runCommand } from '../../run-commands';
import { ResolveExecutorSchema } from './schema';

export default async function run(options: ResolveExecutorSchema, ctx: ExecutorContext): Promise<{ success: boolean }> {
  if ((options.applied && options['rolled-back']) || (!options.applied && !options['rolled-back'])) {
    throw new Error('You must specify either --rolled-back or --applied.');
  }

  return runCommand(options, ctx, {
    description: 'Running Resolve',
    command: 'prisma migrate resolve',
    getArgs,
  });
}

const getArgs = (options: ResolveExecutorSchema): string[] => {
  const args = [];

  if (options?.schema) {
    args.push(`--schema=${options.schema}`);
  }

  if (options?.['rolled-back']) {
    args.push(`--rolled-back=${options['rolled-back']}`);
  }

  if (options?.applied) {
    args.push(`--applied=${options['applied']}`);
  }

  return args;
};
