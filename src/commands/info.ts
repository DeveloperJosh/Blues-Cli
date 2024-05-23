import type { Arguments, CommandBuilder } from 'yargs';
import os from 'os';
import si from 'systeminformation';

export const command: string = 'info';
export const desc: string = 'Info about the pc';
export const builder: CommandBuilder<{}, {}> = (yargs) => yargs;

async function getSystemInfo() {
    const [cpuLoad, cpuData, graphicsData] = await Promise.all([
        si.currentLoad(),
        si.cpu(),
        si.graphics()
    ]);

    const cpuUsage = cpuLoad.currentLoad.toFixed(2); // CPU usage percentage
    const cpuCores = cpuData.physicalCores;
    
    const totalMemory = os.totalmem() / (1024 * 1024); // Convert to MB
    const freeMemory = os.freemem() / (1024 * 1024);   // Convert to MB
    const usedMemory = totalMemory - freeMemory;

    const gpus = graphicsData.controllers;
    const gpu = gpus.length > 0 ? gpus[0] : null;

    const gpuModel = gpu ? gpu.model : 'N/A';
    const gpuUsage = gpu ? (gpu.utilizationGpu !== undefined ? gpu.utilizationGpu.toFixed(2) : 'N/A') : 'N/A';
    const gpuMemoryTotal = gpu ? gpu.memoryTotal : 'N/A';
    const gpuMemoryUsed = gpu ? gpu.memoryUsed : 'N/A';

    return {
        cpuUsage,
        cpuCores,
        totalMemory,
        usedMemory,
        gpuModel,
        gpuUsage,
        gpuMemoryTotal,
        gpuMemoryUsed
    };
}

export const handler = async (argv: Arguments<{}>): Promise<void> => {
    const info = await getSystemInfo();
    const now = new Date();
    const currentTime = now.toLocaleTimeString();

    console.log(`
     _________  _________  _________  _________
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |_________||_________||_________||_________|
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |_________||_________||_________||_________|
    _________  _________  _________  _________
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |_________||_________||_________||_________|
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |         ||         ||         ||         |
    |_________||_________||_________||_________|

    Current Time: ${currentTime}
    OS: ${os.platform()} ${os.arch()}
    CPU: ${os.cpus()[0].model}
    CPU Cores: ${info.cpuCores}
    CPU Usage: ${info.cpuUsage}%
    RAM: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB
    Memory Used: ${info.usedMemory.toFixed(2)} MB / ${info.totalMemory.toFixed(2)} MB
    GPU: ${info.gpuModel}
    GPU Usage: ${info.gpuUsage}
    GPU Memory Usage: ${info.gpuMemoryUsed !== 'N/A' ? info.gpuMemoryUsed + ' MB / ' + info.gpuMemoryTotal + ' MB' : 'N/A'}
    `);

    process.exit(0);
}
