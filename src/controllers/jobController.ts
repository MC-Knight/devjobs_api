import { type Request, type Response } from "express";
import _ from "lodash";
import { validateJob } from "../helpers/validate";
import prisma from "../prisma";
import cloudinary from "../utils/cloudinary";

class JobController {
  static async createJob(req: Request, res: Response) {
    const { error } = validateJob(req.body);
    if (error !== undefined) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let logo: string | undefined;

    if (req.file !== undefined) {
      const file = req.file.path;
      const link = await cloudinary.uploader.upload(file);
      logo = link.secure_url;
    }

    const newJobToAdd = _.pick(req.body, [
      "company",
      "logo",
      "logoBackground",
      "position",
      "postedAt",
      "contract",
      "location",
      "website",
      "apply",
      "description",
    ]);

    newJobToAdd.logo = logo;

    const newJob = await prisma.job.create({
      data: newJobToAdd,
    });

    res.status(201).json({
      message: "Job created successfully",
      data: newJob,
    });
  }

  static async getJobs(req: Request, res: Response) {
    const jobs = await prisma.job.findMany({
      include: {
        role: true,
        requirements: true,
      },
    });

    res.status(200).json({
      data: jobs,
    });
  }

  static async getJob(req: Request, res: Response) {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        role: true,
        requirements: true,
      },
    });

    if (job === null) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    res.status(200).json(job);
  }

  static async updateJob(req: Request, res: Response) {
    const { error } = validateJob(req.body);
    if (error !== undefined) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (job === null) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    let logo: string | undefined = undefined;

    if (req.file !== undefined) {
      const file = req.file.path;
      const link = await cloudinary.uploader.upload(file);
      logo = link.secure_url;
    }

    const updatedJobToAdd = _.pick(req.body, [
      "company",
      "logo",
      "logoBackground",
      "position",
      "postedAt",
      "contract",
      "location",
      "website",
      "apply",
      "description",
    ]);

    if (logo === undefined && job.logo !== undefined) {
      updatedJobToAdd.logo = job.logo;
    } else {
      if (logo !== undefined) {
        updatedJobToAdd.logo = logo;
      }
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: parseInt(id),
      },
      data: updatedJobToAdd,
    });

    res.status(200).json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  }

  static async deleteJob(req: Request, res: Response) {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (job === null) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    await prisma.role.deleteMany({
      where: {
        jobId: parseInt(id),
      },
    });

    await prisma.requirement.deleteMany({
      where: {
        jobId: parseInt(id),
      },
    });

    await prisma.job.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Job deleted successfully",
      job,
    });
  }
}

export default JobController;
